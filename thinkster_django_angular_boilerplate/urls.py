from django.conf.urls import patterns, url, include

from thinkster_django_angular_boilerplate.views import IndexView
from django.contrib import admin

from rest_framework_nested import routers

from authentication.views import AccountViewSet

admin.autodiscover()
router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)

urlpatterns = patterns(
     '',
    url(r'^admin/', include(admin.site.urls)),
    # ... URLs
    url(r'^api/v1/', include(router.urls)),

    url('^.*$', IndexView.as_view(), name='index'),
)