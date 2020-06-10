FROM ruby:2.6.3
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
RUN mkdir /qwerty
WORKDIR /qwerty
COPY Gemfile /qwerty/Gemfile
COPY Gemfile.lock /qwerty/Gemfile.lock

# https://bundler.io/v2.0/guides/bundler_docker_guide.html
# ENV GEM_HOME="/usr/local/bundle"
# ENV PATH $GEM_HOME/bin:$GEM_HOME/gems/bin:$PATH

ENV BUNDLER_VERSION='2.1.4'
RUN gem update --system
RUN gem install bundler -v 2.1.4
RUN bundle --version
RUN bundle install
COPY . /qwerty

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3001

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
