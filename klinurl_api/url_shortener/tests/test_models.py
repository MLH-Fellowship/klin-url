from django.test import TestCase
from apps.posts.models import Post, Community
from apps.users.models import CustomUser, Badge

# Create your tests here.

#this class tests the custom-user model
class PostModelTest(TestCase):

	""" This test the post model """

	@classmethod
	def setUpTestData(cls): 
		
		#creating a badge object
		Badge.objects.create(name="Rookie")

		#creating a user object
		user = CustomUser.objects.create(email = "cnyior27@aun.edu.ng", username = "Clement_Nyior", bio = "Things dey occur")

		#creating a community object
		circle = Community.objects.create(name="Rookie", super_moderator=user)

		#creating a post object
		Post.objects.create(slug = "slug-1", caption = "Testing durrh", author = user, community=circle)
        
	
	def test_slug(self):
		""" tests slug field of the Post model""" 

		post = Post.objects.get(id=1)
		label = post._meta.get_field('slug').verbose_name
		size = post._meta.get_field('slug').max_length
		self.assertEquals(label, 'slug')
		self.assertEquals(size, 255)
			

	def test_caption(self):
		""" tests caption field of the Post Model"""

		post = Post.objects.get(id=1)
		label = post._meta.get_field('caption').verbose_name
		size = post._meta.get_field('caption').max_length
		self.assertEquals(label, 'caption')
		self.assertEquals(size, 500)

	def test_author(self):
		""" tests author field of the post model"""

		post = Post.objects.get(id=1)
		label = post._meta.get_field('author').verbose_name
		self.assertEquals(label, 'author')

	def test_community(self):
		""" tests community field of the post model"""

		post = Post.objects.get(id=1)
		label = post._meta.get_field('community').verbose_name
		self.assertEquals(label, 'community')



        

    
