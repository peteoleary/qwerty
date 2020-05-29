#!/bin/bash
set -e

# https://bundler.io/v2.0/guides/bundler_docker_guide.html
# unset BUNDLE_PATH
# unset BUNDLE_BIN

# Remove a potentially pre-existing server.pid for Rails.
rm -f /ecommerce-gifts/tmp/pids/server.pid

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"