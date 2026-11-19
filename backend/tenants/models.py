
from django.db import models
from django_tenants.models import TenantMixin, DomainMixin


class Client(TenantMixin):
    name = models.CharField(max_length=100)

    short_code = models.SlugField(
        max_length=50,
        unique=True
    )

    brand_color = models.CharField(
        max_length=7,
        default="#2563EB"
    )

    auto_create_schema = True

    def __str__(self):
        return self.name


class Domain(DomainMixin):
    def __str__(self):
        return self.domain
