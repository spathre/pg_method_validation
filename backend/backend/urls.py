from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('validation.urls')),  # 👈 This line connects /api/ to your app
]
