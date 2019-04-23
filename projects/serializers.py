# -*- coding: utf-8 -*-
from pkg_resources import safe_version
from rest_framework import serializers

from .models import Label, Comment, Links, Docs, ProjectVersion, Project


class LabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Label
        fields = ("name",)


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ("message",)


class LinksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Links
        fields = ("project", "homepage", "issues", "contact")


class ProjectDocsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Docs
        fields = ("readme", "contributing", "changelog", "code_of_conduct")


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ("name", "num_stars", "git_url")


class ProjectVersionSerializer(serializers.Serializer):
    display_name = serializers.CharField(max_length=120)
    tagline = serializers.CharField(max_length=80)
    short_description = serializers.CharField(max_length=280)
    version = serializers.CharField(max_length=20)
    publish_date = serializers.DateTimeField()
    metadata = serializers.DictField()
    labels = LabelSerializer(many=True)
    comments = CommentSerializer(many=True)
    project = ProjectSerializer()

    def validate_metadata(self, dict_value):
        for key, value in dict_value.items():
            if not isinstance(key, str):
                raise serializers.ValidationError(
                    f"Invalid metadata. All keys and values must be strings. Found key: {key}"
                )
            if not isinstance(value, str):
                raise serializers.ValidationError(
                    f"Invalid metadata. All keys and values must be strings. Found value: {value}"
                )
        return dict_value

    def update(self, instance, validated_data):
        for k in [
            "display_name",
            "tagline",
            "short_description",
            "publish_date",
            "metadata",
            "labels",
            "docs",
            "links",
            "comments",
        ]:
            setattr(instance, k, validated_data.get(k, getattr(instance, k)))

        instance.version = str(
            safe_version(validated_data.get("version", instance.version))
        )
        instance.save()

    def create(self, validated_data):
        return ProjectVersion(**validated_data)
