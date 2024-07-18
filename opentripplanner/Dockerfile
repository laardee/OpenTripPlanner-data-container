FROM hsldevcom/opentripplanner:<OTP_TAG>

WORKDIR /var/otp/<OTP_GRAPH_DIR>

ENTRYPOINT java $JAVA_OPTS -cp @/app/jib-classpath-file @/app/jib-main-class-file /var/otp/<OTP_GRAPH_DIR> --load --serve
