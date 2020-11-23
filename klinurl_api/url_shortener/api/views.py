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
        base_url = f"{ request.scheme }://{ request.get_host }"

        if serializer.is_valid():
            klin_url = ""

            if request.data["klin_url"]:
                klin_url = request.data["klin_url"]
            else:
                klin_url = create_shortened_url()

            serializer.save(klin_url = klin_url)

            return Response(
                            {
                                'success': True,
                                'data' : {
                                            "longUrl": serializer.data["long_url"],
                                            "klinUrl": base_url + serializer.data["klin_url"]
                                         },
                                'message': "Your url has been successfully shortened"

                            }
                            )

        return Response(
                        {
                            'success': False,
                            'message': "Something is wrong with your request"

                        }
                        )


def redirect_view(request, klin_url):
    """
    Redirect to a given object from a short URL.
    """
    model = Url
    obj = get_object_or_404(model, klin_url=klin_url)
    return redirect(obj)