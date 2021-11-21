from .models import (Manufacturer, System, Game, Collectible,
    GameProfile, GameList, CollectibleCategory)
from rest_framework import serializers


class ManufacturerSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Manufacturer
        fields = ('id', 'name', 'date_founded', 'description')


class SystemSerializer(serializers.HyperlinkedModelSerializer):
    manufacturer = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = System
        fields = ('id', 'name', 'manufacturer', 'date_released', 
            'abbreviation', 'description')


class GameSerializer(serializers.HyperlinkedModelSerializer):
    display_image_url = serializers.SerializerMethodField()
    system = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Game
        fields = ('id', 'name', 'system', 'date_released', 
            'publisher', 'description', 'display_image_url')

    def get_display_image_url(self, obj):
        try:
            url = obj.display_image.url
            return url
        except:
            return None


class CollectibleSerializer(serializers.HyperlinkedModelSerializer):
    game = serializers.SerializerMethodField()

    class Meta:
        model = Collectible
        fields = ('id', 'name', 'game', 'location', 'description')

    def get_game(self, obj):
        return obj.game.id


class GameProfileSerializer(serializers.HyperlinkedModelSerializer):
    game = serializers.SerializerMethodField()
    collectibles = CollectibleSerializer(many=True)
    user = serializers.SerializerMethodField()
    percentage_complete = serializers.SerializerMethodField()

    class Meta:
        model = GameProfile
        fields = ('id', 'name', 'game', 'user', 
            'collectibles', 'created_at', 'finished_at',
            'percentage_complete')

    def get_game(self, obj):
        return obj.game.id

    def get_user(self, obj):
        return obj.user.id

    def get_percentage_complete(self, obj):
        number_collected = float(len(obj.collectibles.all()))
        number_needed = float(len(Collectible.objects.filter(game=obj.game)))
        if number_needed == float(0):
            return 0.0
        long_num = (number_collected/number_needed) * 100
        return format(long_num, '.1f')


class GameListSerializer(serializers.HyperlinkedModelSerializer):
    games = GameSerializer(many=True)
    user = serializers.SerializerMethodField()

    class Meta:
        model = GameList
        fields = ('id', 'games', 'user')

    def get_user(self, obj):
        return obj.user.id


class CollectibleCategorySerializer(serializers.HyperlinkedModelSerializer):
    collectibles = serializers.SerializerMethodField()

    class Meta:
        model = CollectibleCategory
        fields = ('id', 'title', 'collectibles')

    def get_collectibles(self, obj):
        collectibles = obj.collectible_set.all()

        return CollectibleSerializer(collectibles, many=True).data
