# Experiment 3.2.2 - CI/CD Pipeline with GitHub Actions

This project demonstrates an end-to-end CI/CD pipeline for a React application using GitHub Actions.

## Aim

To implement an automated CI/CD pipeline for a React application using GitHub Actions.

## Objectives

1. Configure GitHub Actions workflow
2. Implement testing stage
3. Set up Docker build and push
4. Deploy to GitHub Packages using GitHub Container Registry
5. Add deployment notifications

## Tech Stack

- React with Vite
- Vitest and Testing Library
- Docker
- GitHub Actions
- GitHub Container Registry
- Slack Webhooks

## Expected Output

- Automated testing on pull request creation
- Docker image built and pushed to GitHub Container Registry
- Slack notification on successful deployment
- Image tagged with both `latest` and the commit SHA

## Project Structure

```text
.
|-- .github/workflows/cicd.yml
|-- Dockerfile
|-- src/App.jsx
|-- src/App.test.jsx
|-- package.json
|-- vite.config.js
```

## GitHub Secrets Required

Add these repository secrets before running the deployment workflow:

- `SLACK_WEBHOOK_URL`: Incoming Slack webhook URL

`GITHUB_TOKEN` is automatically provided by GitHub Actions and is used to push to GHCR.

## Workflow Behavior

### On Pull Request to `main`

- Installs dependencies
- Runs unit tests
- Builds the React application

### On Push to `main`

- Runs tests
- Builds the project
- Builds the Docker image
- Pushes the image to `ghcr.io/<owner>/<repo>`
- Sends a Slack notification after deployment

## Commands

```bash
npm install
npm test
npm run build
docker build -t exp3-2-2-cicd .
```

## Notes

- The Docker image is tagged as `latest` and with the short commit SHA in GitHub Actions.
- If your package is private, make sure package visibility is configured correctly in GitHub Packages.
