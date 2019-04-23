# -*- coding: utf-8 -*-

from django.core.management.base import BaseCommand
from projects.models import Label, Project


class Command(BaseCommand):
    def handle(self, *args, **options):
        Project.objects.all().delete()
        Label.objects.all().delete()
