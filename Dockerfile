FROM ruby:2.5.1
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
RUN mkdir /ecommerce-gifts
WORKDIR /ecommerce-gifts
COPY Gemfile /ecommerce-gifts/Gemfile
COPY Gemfile.lock /ecommerce-gifts/Gemfile.lock

# https://bundler.io/v2.0/guides/bundler_docker_guide.html
# ENV GEM_HOME="/usr/local/bundle"
# ENV PATH $GEM_HOME/bin:$GEM_HOME/gems/bin:$PATH

ENV BUNDLER_VERSION='2.1.4'
RUN gem update --system
RUN gem install bundler -v 2.1.4
RUN bundle config gems.rapidrailsthemes.com pete%40vipgiftsandbaskets.com:4cd33717f4f09ef8bb0a
RUN bundle --version
RUN bundle install
COPY . /ecommerce-gifts

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
