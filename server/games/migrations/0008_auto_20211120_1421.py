# Generated by Django 3.2.7 on 2021-11-20 14:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0007_auto_20180426_0027'),
    ]

    operations = [
        migrations.CreateModel(
            name='CollectibleCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=140)),
                ('game', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='games.game')),
            ],
        ),
        migrations.AddField(
            model_name='collectible',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='games.collectiblecategory'),
        ),
    ]
