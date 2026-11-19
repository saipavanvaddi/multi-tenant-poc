
from django.core.management.base import BaseCommand
from django_tenants.utils import schema_context

from tenants.models import Client, Domain
from store.models import Product


DEMO_SHOPS = [
    {
        "name": "Ananya Shop",
        "short_code": "ananya",
        "domain": "ananya.localhost",
        "brand_color": "#2563EB",
        "products": [
            {"name": "Laptop", "price": "50000", "image_url": "https://placehold.co/400x300?text=Laptop"},
            {"name": "Mouse", "price": "500", "image_url": "https://placehold.co/400x300?text=Mouse"},
            {"name": "Keyboard", "price": "1000", "image_url": "https://placehold.co/400x300?text=Keyboard"},
        ],
    },
    {
        "name": "Kiran Shop",
        "short_code": "kiran",
        "domain": "kiran.localhost",
        "brand_color": "#16A34A",
        "products": [
            {"name": "Shirt", "price": "800", "image_url": "https://placehold.co/400x300?text=Shirt"},
            {"name": "Shoes", "price": "2000", "image_url": "https://placehold.co/400x300?text=Shoes"},
            {"name": "Watch", "price": "1500", "image_url": "https://placehold.co/400x300?text=Watch"},
        ],
    },
]


class Command(BaseCommand):
    help = "Create two demo shops with separate schemas and products"

    def handle(self, *args, **options):

        for shop in DEMO_SHOPS:

            # 1. Create tenant
            client, created = Client.objects.get_or_create(
                schema_name=shop["short_code"],
                defaults={
                    "name": shop["name"],
                    "short_code": shop["short_code"],
                    "brand_color": shop["brand_color"],
                },
            )

            # 2. Ensure tenant schema exists
            client.create_schema(
                check_if_exists=True,
                sync_schema=True,
            )

            # 3. Register domain in public schema
            Domain.objects.update_or_create(
                domain=shop["domain"],
                defaults={
                    "tenant": client,
                    "is_primary": True,
                },
            )

            # 4. Insert products into the correct schema
            with schema_context(client.schema_name):

                for product in shop["products"]:
                    Product.objects.get_or_create(
                        name=product["name"],
                        defaults={
                            "price": product["price"],
                            "image_url": product["image_url"],
                            "in_stock": True,
                        },
                    )

            self.stdout.write(
                self.style.SUCCESS(
                    f"Created shop: {shop['name']} "
                    f"({shop['domain']})"
                )
            )

        self.stdout.write(
            self.style.SUCCESS("Demo shops created successfully!")
        )
