# Changing an Object's Position and Shape

Translation moves an object's position, rotation changes its orientation around a reference point, and scaling increases or decreases its size along each axis. Applying the same rules to every vertex places an object in the scene.

Transforms can be represented as matrices and multiplied together into one composite transform. Matrix multiplication is generally noncommutative, so “rotate first, then translate” and “translate first, then rotate” produce different results.
