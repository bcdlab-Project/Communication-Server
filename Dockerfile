FROM node:18-alpine
LABEL "Project" = "bcdLab Project | Container for the Communication Server of the bcdLab Project Main Node"
LABEL "PropertyOf" = "bcdLab Project"
LABEL "Note" = "This Container is not suposed to be public and it is only for private use in the bcdLab Project System"
LABEL "Version"="1.0"
LABEL "MoreInfo" = "https://bcdlab.xyz"
LABEL "Contact" = "contact@mail.bcdlab.xyz"

COPY "./" "/server"
EXPOSE 3000
WORKDIR "/server"
CMD ["npm", "start"]