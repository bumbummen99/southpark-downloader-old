#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd)

# Change working directory to project root
cd $SCRIPT_DIR/../../

# Install dependencies
npm i