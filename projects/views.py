from django.shortcuts import render
from projects.models import Project, ProjectVersion
from projects.serializers import ProjectVersionSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.


class ProjectVersionList(generics.ListAPIView):
    queryset = ProjectVersion.objects.all()
    serializer_class = ProjectVersionSerializer
