########
# Base #
########
FROM node:lts-alpine as base

# Install required software using the package manager
RUN apk add --no-cache curl

################
# Dependencies #
################
FROM base as dependencies

# Install latest version of YouTube-DL(P)
RUN curl -L \
    https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp \
    --output /usr/local/bin/youtube-dl

# Install custom FFMPEG build for YouTube-DL(P)
RUN curl -L \
    https://github.com/yt-dlp/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-linux64-gpl.tar.xz \
    --output ffmpeg.tar.xz && \
    tar -xf ffmpeg.tar.xz --strip 1 bin && \
    mv bin/* /usr/local/bin/ && \
    rm -R bin

# Create application diectory
RUN mkdir /app

# Set working directory of the image to the application directory
WORKDIR /app

# Run the application
ENTRYPOINT [ "spdl" ]

# Download by default
CMD [ "download" ]

###############
# Development #
###############
FROM dependencies as development

# Mount the local build
VOLUME /app

##############
# Production #
##############
FROM dependencies as production

# Add the local build
COPY dist /app
