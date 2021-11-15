"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls import url, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from rest_framework import routers
from games.views import (ManufacturerViewSet, SystemViewSet,
    GameViewSet, CollectibleViewSet, GameProfileViewSet,
    GameListViewSet)
from api.views import AuthViewSet

router = routers.DefaultRouter()
router.register(r'manufacturers', ManufacturerViewSet)
router.register(r'systems', SystemViewSet)
router.register(r'games', GameViewSet)
router.register(r'collectibles', CollectibleViewSet, 'collectibles')
router.register(r'gameprofiles', GameProfileViewSet, 'gameprofiles')
router.register(r'gamelist', GameListViewSet, 'gamelist')
router.register(r'auth', AuthViewSet, 'auth')

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns.extend(static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT))