FROM php:7.2-fpm

RUN apt-get update && apt-get install -y \
	git curl zip gnupg gnupg2 gnupg1 libssh-dev libxslt-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - \
	&& curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
	&& echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update && apt-get install -y nodejs yarn

RUN docker-php-ext-install \
    bcmath \
	zip

WORKDIR /var/www/html

RUN curl -sS https://getcomposer.org/installer | \
    php -- --install-dir=/usr/bin/ --filename=composer

RUN composer global require hirak/prestissimo

RUN mkdir -p var/cache var/logs var/sessions \
	&& chown -R www-data var
