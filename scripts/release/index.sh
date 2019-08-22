set -e
echo "Enter relase version-version command"
read VERSIONCOMMAND
read -p "Releasing $VERSIONCOMMAND - are you sure?(y/n)" -n 1 -r
if [[ $REPLY =~ ^[Yy]$ ]]
then
  yarn sdk:build &&
  echo $VERSIONCOMMAND
  standard-version -- $VERSIONCOMMAND &&
  npm login &&
  npm publish
fi
