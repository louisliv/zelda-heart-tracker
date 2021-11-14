from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Manufacturer(models.Model):
	name = models.CharField(max_length=140)
	date_founded = models.DateField()
	description = models.TextField()

	def __str__(self):
		return self.name

class System(models.Model):
	name = models.CharField(max_length=140)
	manufacturer = models.ForeignKey(Manufacturer, 
		on_delete=models.CASCADE)
	date_released = models.DateField()
	abbreviation = models.CharField(max_length=10)
	description = models.TextField()

	def __str__(self):
		return self.name

class Game(models.Model):
	name = models.CharField(max_length=140)
	publisher = models.CharField(max_length=100)
	date_released = models.DateField()
	description = models.TextField()
	system = models.ForeignKey(System, 
		on_delete=models.CASCADE)
	display_image = models.ImageField(upload_to='game_display_images',
		blank=True, null=True)

	def __str__(self):
		return self.name

class Collectible(models.Model):
	name = models.CharField(max_length=140)
	game = models.ForeignKey(Game, 
		on_delete=models.CASCADE)
	location = models.CharField(max_length=140)
	description = models.TextField()

	def __str__(self):
		return '%s - %s' % (self.name, self.game.name)

class GameProfile(models.Model):
	name = models.CharField(max_length=140)
	game = models.ForeignKey(Game, 
		on_delete=models.CASCADE)
	user = models.ForeignKey(User, 
		on_delete=models.CASCADE)
	created_at = models.DateTimeField(auto_now_add=True)
	finished_at = models.DateTimeField(blank=True, null=True)
	collectibles = models.ManyToManyField(Collectible, blank=True)

	def __str__(self):
		return self.name

class GameList(models.Model):
	user = models.OneToOneField(User, 
		on_delete=models.CASCADE)
	games = models.ManyToManyField(Game)

	def __str__(self):
		return '%s\'s Game List' % self.user.get_username()
		