# The Purpose of CI and CD

Continuous Integration (CI) is the practice of sharing small changes frequently and automatically building and testing them to reduce integration costs. If changes stay on a branch for a long time before being merged, conflicts and hidden assumptions surface all at once. Short integration cycles provide faster feedback.

CD is the process of delivering validated changes. Continuous Delivery focuses on preparing an artifact that can be deployed at any time. Continuous Deployment also automatically deploys changes that pass the required checks to production. A team can add manual approval points based on its risk tolerance.

The purpose of a pipeline is not simply to click buttons automatically; it is to produce reproducible results from the same inputs. Specify the source version, dependencies, build tools, and environment, and keep logs at failure points so you can tell where quality broke down.
