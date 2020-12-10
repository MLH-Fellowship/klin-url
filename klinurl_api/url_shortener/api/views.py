from django.shortcuts import get_object_or_404, redirect

from rest_framework import  generics
from rest_framework.views import APIView
from rest_framework.response import Response

from url_shortener.models import Url, Author
from url_shortener.api.serializer import UrlSerializer
from url_shortener.api.utils import (
                                      create_shortened_url,
                                      get_or_create_clientid,
                                      set_cookie
                                      )


class UrlShortenerAPIView(APIView):
    serializer_class = UrlSerializer
   
    def post(self, request):
        """
            Allows for the shortening of urls.
            this endpoint accepts a POST request
            with a payload in the form below
            {
                'longUrl' : 'the url to be shortened'
            }

            it then returns a response in the form below:

            {
                'longUrl' : 'the url to be shortened',
                'klinUrl' : 'the shortened url'
            }

            you could test this endpoint in your browser.
            it's Python baby :)
        """
        serializer = self.serializer_class(data=request.data)
        base_url = f"{request.get_host()}/"
        scheme = f"{ request.scheme }://"
        
       
        if serializer.is_valid():
            long_url = request.data["long_url"]

            if Url.objects.filter(long_url=long_url).exists():
                url = Url.objects.get(long_url=long_url)

                return Response(
                                {
                                    'success': True,
                                    'data' : {
                                                "longUrl": long_url,
                                                "klinUrl": url.klin_url,
                                                "scheme": scheme,
                                                "isDuplicate":True
                                            },
                                    'message': "Your url is a duplicate"
                                }
                                )
                
            else:
            
                slug = create_shortened_url()
                klin_url = base_url + slug 
                client_id = get_or_create_clientid(
                                                    request, 
                                                    klin_url
                                                    )
                serializer.save(
                                slug=slug,
                                klin_url=klin_url,
                                created_by=client_id
                                )
                response = Response(
                                {
                                    'success': True,
                                    'data' : {
                                                "longUrl": long_url,
                                                "klinUrl": klin_url,
                                                "scheme": scheme,
                                                "isDuplicate":False
                                            },
                                    'message': "Your url has been successfully shortened"
                                }
                                )
                set_cookie(request, response, client_id)
                return response


class UrlListAPIView(generics.ListAPIView):
    """
        This returns all the urls shortened by a user.
    """
    serializer_class = UrlSerializer

    def get_queryset(self):
        client_id = self.request.COOKIES['client_id']
        author = Author.objects.get(client_id=client_id)

        return Url.objects.filter(created_by=author).order_by("-date_created")




def redirect_view(request, slug):
    """
        Redirect to a given object from a given a short url.
        now updated to work with slug
    """
    model = Url
    obj = get_object_or_404(model, slug=slug)
    return redirect(obj)