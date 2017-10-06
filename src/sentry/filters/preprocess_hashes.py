from __future__ import absolute_import

from django.core.cache import cache, get_cache, InvalidCacheBackendError

from sentry.models import FilteredGroupHash

try:
    hash_cache = get_cache('preprocess_hash')
except InvalidCacheBackendError:
    hash_cache = cache


def get_raw_cache_key(project_id, event_id):
    return 'e:raw:{1}:{0}'.format(project_id, event_id)


def matches_discarded_hash(data, project):
    return FilteredGroupHash.objects.filter(
        project_id=project,
        hash__in=get_preprocess_hashes(data),
    ).exists()
