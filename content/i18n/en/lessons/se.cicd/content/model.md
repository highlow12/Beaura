# Pipelines and Artifacts

A typical pipeline receives a commit, installs dependencies, builds the project, and runs static checks and tests. If validation passes, it stores the same artifact that the deployment stage sends to the target environment. Rebuilding during deployment can make the production build differ from the one that was validated.

Each stage should have clear inputs, outputs, and failure conditions. Run fast linting and unit tests first, followed by more expensive integration and end-to-end checks, to catch bad changes early. Hard-to-reverse operations, such as security scans and database migrations, need separate approval and a rollback plan.

A successful pipeline does not guarantee a successful product deployment. Inject secrets securely, minimize permissions, separate environment-specific settings, and prepare health checks and rollback procedures. Automation provides both speed and safety when failed deployments can be stopped quickly and rolled back to a previous known-good artifact.
