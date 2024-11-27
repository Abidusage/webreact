from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from users.models import Admin  

class Command(BaseCommand):
    help = 'Create a superuser admin if not exists'

    def handle(self, *args, **options):
        if not User.objects.filter(username="kasage").exists():
            admin_user = User.objects.create_superuser(username="kasage", email="abidusage@gmail.com", password="Toujours#toucher")
            Admin.objects.create(user=admin_user)
            self.stdout.write(self.style.SUCCESS('Successfully created superuser "admin"'))
        else:
            self.stdout.write(self.style.WARNING('Superuser "admin" already exists'))
