# Use LTS and keep image size small by using alpine
FROM node:lts-alpine

# Install latest version of YouTube-DL(P)
RUN curl \
    https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp \
    --output /usr/local/bin/youtube-dl

# Install custom FFMPEG build for YouTube-DL(P)
RUN curl -L \
    https://github.com/yt-dlp/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-linux64-gpl.tar.xz \
    --output ffmpeg.tar.xz && \
    tar --strip 1 --wildcards -xf ffmpeg.tar.xz */bin && \
    mv bin/* /usr/local/bin/ && \
    rm -R bin

# Add application source code
# TODO

# Run the application
ENTRYPOINT [ "spdl" ]
#CMD [ "download" ]