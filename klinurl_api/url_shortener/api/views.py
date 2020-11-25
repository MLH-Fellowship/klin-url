from django.shortcuts import get_object_or_404, redirect

from rest_framework import  generics
from rest_framework.views import APIView
from rest_framework.response import Response

from url_shortener.models import Url
from url_shortener.api.serializer import UrlSerializer
from url_shortener.api.utils import create_shortened_url


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
        base_url = f"{ request.get_host() }/"
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
                                                    "klinUrl": base_url + url.klin_url,
                                                    "scheme": scheme,
                                                    "isDuplicate":True
                                                },
                                        'message': "Your url is a duplicate"

                                    }
                                    )
            else:
            
                klin_url = create_shortened_url()

                serializer.save(klin_url = klin_url)

                return Response(
                                {
                                    'success': True,
                                    'data' : {
                                                "longUrl": long_url,
                                                "klinUrl": base_url + serializer.data["klin_url"],
                                                "scheme": scheme,
                                                "isDuplicate":False
                                            },
                                    'message': "Your url has been successfully shortened"

                                }
                                )


def redirect_view(request, klin_url):
    """
    Redirect to a given object from a given a short url.
    """
    model = Url
    obj = get_object_or_404(model, klin_url=klin_url)
    return redirect(obj)