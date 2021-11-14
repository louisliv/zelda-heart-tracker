from django.contrib import admin
from .models import (Manufacturer, System, Game, Collectible,
	GameProfile, GameList)

# Register your models here.
admin.site.register(Manufacturer)
admin.site.register(System)
admin.site.register(Game)
admin.site.register(Collectible)
admin.site.register(GameProfile)
admin.site.register(GameList)