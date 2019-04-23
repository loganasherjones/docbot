from django.contrib.postgres.fields import JSONField
from django.db import models
from pkg_resources import parse_version, safe_version


class Project(models.Model):
    name = models.CharField(unique=True, max_length=100)
    num_stars = models.IntegerField(default=0)
    git_url = models.URLField(unique=True)

    def get_latest_version(self, release=True):
        if release:
            func = parse_version
        else:
            func = safe_version
        latest = None
        for proj in self.projectversion_set.all():
            if latest is None or func(proj.version) > func(latest):
                latest = proj.version

        return latest


class Label(models.Model):
    name = models.CharField(unique=True, max_length=120)


class ProjectVersion(models.Model):
    project = models.ForeignKey(
        Project, related_name="versions", on_delete=models.CASCADE
    )
    display_name = models.CharField(max_length=120)
    tagline = models.CharField(max_length=80)
    short_description = models.CharField(max_length=280)
    version = models.CharField(max_length=20)
    publish_date = models.DateTimeField("date published", auto_now_add=True)
    metadata = JSONField()
    labels = models.ManyToManyField(Label)

    class Meta:
        ordering = ["-publish_date", "display_name", "version"]

    def __str__(self):
        return "%s (%s) - %s" % (self.display_name, self.version, self.tagline)

    @property
    def latest_version(self):
        return self.project.get_latest_version()

    @property
    def is_latest(self):
        return self.project.get_latest_version() == self.version


class Comment(models.Model):
    project = models.ForeignKey(
        ProjectVersion, on_delete=models.CASCADE, related_name="comments"
    )
    message = models.CharField(max_length=280)


class Links(models.Model):
    project = models.ForeignKey(
        ProjectVersion, related_name="links", on_delete=models.CASCADE
    )
    homepage = models.URLField()
    issues = models.URLField()
    contact = models.URLField()


class Docs(models.Model):
    project = models.ForeignKey(
        ProjectVersion,
        on_delete=models.CASCADE,
        related_name="docs",
        related_query_name="docs",
    )
    readme = models.TextField()
    contributing = models.TextField()
    changelog = models.TextField()
    code_of_conduct = models.TextField()
