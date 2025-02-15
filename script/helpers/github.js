#!/usr/bin/env node
import dotenv from 'dotenv'
import { Octokit } from '@octokit/rest'

if (!process.env.GITHUB_TOKEN) {
  dotenv.config()
}

// check for required PAT
if (!process.env.GITHUB_TOKEN) {
  throw new Error(
    'Error! You must have a GITHUB_TOKEN set in an .env file to use the GitHub REST API.'
  )
}

// this module needs to work in development, production, and GitHub Actions
//
// GITHUB_TOKEN comes from one of the following sources:
// 1. set in the .env file (development)
// 2. set as a Heroku config var (staging and production)
// 3. an installation token granted via GitHub Actions
const apiToken = process.env.GITHUB_TOKEN

// See https://github.com/octokit/rest.js/issues/1207
export default function github() {
  return new Octokit({
    auth: `token ${apiToken}`,
  })
}
