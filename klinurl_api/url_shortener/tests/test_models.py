from django.test import TestCase

from url_shortener.models import Url
from url_shortener.api.utils import create_shortened_url


class PostModelTest(TestCase):
    """ This tests the Url model """

    @classmethod
    def setUpTestData(cls):
        klin_url = create_shortened_url()
                        
        #creating a url object
        Url.objects.create(
                            klin_url = klin_url, 
                            long_url = '''
                                        https://medium.com/@shalandy/                 deploy-git-subdirectory-to-heroku-ea05e95fce1f
                                        '''
                            )

	
    def test_klin_url(self):
        """ tests klin_url field of the Url model""" 

        url = Url.objects.get(id=1)
        label = url._meta.get_field('klin_url').verbose_name
        size = url._meta.get_field('klin_url').max_length
        self.assertEquals(label, 'klin url')
        self.assertEquals(size, 30)
			

    def test_long_url(self):
        """ tests long_url field of the Url model""" 

        url = Url.objects.get(id=1)
        label = url._meta.get_field('long_url').verbose_name
        self.assertEquals(label, 'long url')
    