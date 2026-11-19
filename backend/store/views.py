
from django.http import JsonResponse

from .models import Product


def store_details(request):
    tenant = request.tenant

    return JsonResponse({
        "name": tenant.name,
        "brand_color": tenant.brand_color,
    })


def product_list(request):
    products = Product.objects.all().order_by("id")

    data = [
        {
            "id": product.id,
            "name": product.name,
            "price": str(product.price),
            "image_url": product.image_url,
            "in_stock": product.in_stock,
        }
        for product in products
    ]

    return JsonResponse({
        "products": data,
    })
