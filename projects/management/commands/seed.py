# -*- coding: utf-8 -*-
import datetime
import os
import random
import string
from django.core.management.base import BaseCommand
from projects.models import ProjectVersion, Project, Docs, Links, Label
from django.utils import timezone
import lorem

current_dir = os.path.abspath(os.path.dirname(__file__))
README = open(os.path.join(current_dir, "README.example.md")).read()
CODE_OF_CONDUCT = open(os.path.join(current_dir, "CODE_OF_CONDUCT.example.md")).read()
CONTRIBUTING = open(os.path.join(current_dir, "CONTRIBUTING.example.md")).read()
CHANGELOG = open(os.path.join(current_dir, "CHANGELOG.example.md")).read()


class Command(BaseCommand):
    help = "Create base commands"

    def random_string(self, n=10):
        return "".join(
            random.choice(string.ascii_uppercase + string.digits) for _ in range(n)
        )

    def random_text(self, max_length=280):
        return lorem.text()[:max_length]

    def create_labels(self):
        base_str = ""
        second_level = ""
        labels = []

        for i in range(30):
            if i % 5 == 0:
                base_str = self.random_string()
            if i % 3 == 0:
                second_level = self.random_string()

            if i % 3 != 0:
                third_level = f"::{self.random_string()}"
            else:
                third_level = ""
            label = Label(name=f"{base_str}::{second_level}{third_level}")
            label.save()
            labels.append(label)
        return labels

    def add_comments(self, project_version):
        num_comments = random.randrange(1, 4)
        for _ in range(num_comments):
            comment_length = random.randrange(150, 280)
            project_version.comments.create(message=self.random_text(comment_length))

    def add_links(self, project_version):
        pl = Links()
        for i in range(random.randrange(1, 3)):
            if i == 0:
                pl.homepage = "https://beer-garden.io"
            elif i == 1:
                pl.issues = "https://github.com/beer-garden/beer-garden/issues"
            else:
                pl.contact = "https://gitter.im"
        pl.project_id = project_version.id
        pl.save()

    def add_docs(self, project_version):
        pd = Docs()
        for i in range(random.randrange(1, 4)):
            if i == 0:
                pd.readme = README
            elif i == 1:
                pd.contributing = CONTRIBUTING
            elif i == 2:
                pd.changelog = CHANGELOG
            else:
                pd.code_of_conduct = CODE_OF_CONDUCT
        pd.project_id = project_version.id
        pd.save()

    def update_labels(self, project_version, labels):
        project_version.labels.add(*(random.choices(labels, k=random.randrange(1, 4))))

    def create_project_versions(self, project, num_versions, labels):
        base_version = "1.%d.0"
        delta_kwargs = [{"days": 30}, {"days": 7}, {"days": 1}]
        versions = []
        for i in range(num_versions):
            p = ProjectVersion(
                display_name="Project %d" % int(project.name[7:]),
                tagline=self.random_text(80),
                short_description=self.random_text(280),
                version=base_version % i,
                publish_date=timezone.now()
                - datetime.timedelta(**delta_kwargs[i % len(delta_kwargs)]),
                metadata={
                    "author": self.random_string(),
                    self.random_string(): self.random_string(),
                },
                project_id=project.id,
            )
            p.save()
            self.update_labels(p, labels)
            self.add_comments(p)
            self.add_links(p)
            self.add_docs(p)
            versions.append(p)

    def handle(self, *args, **options):
        num_projects = 750
        labels = self.create_labels()

        for i in range(num_projects):
            print("Creating project %d" % i)
            num_stars = random.randrange(1, 5000)
            project = Project(
                name="project%d" % i,
                num_stars=num_stars,
                git_url="https://github.com/loganasherjones/yapconf%d" % i,
            )
            project.save()
            num_versions = random.randrange(1, 4)
            self.create_project_versions(project, num_versions, labels)
