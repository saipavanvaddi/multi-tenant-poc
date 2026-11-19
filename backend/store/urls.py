
from django.urls import path

from . import views

urlpatterns = [
    path("store/", views.store_details, name="store-details"),
    path("products/", views.product_list, name="product-list"),
]
