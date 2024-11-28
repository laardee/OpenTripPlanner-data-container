ARG OTP_TAG="v2"
FROM hsldevcom/opentripplanner:${OTP_TAG}

ARG OTP_GRAPH_DIR
WORKDIR /var/otp/${OTP_GRAPH_DIR}

ENTRYPOINT java $JAVA_OPTS -cp @/app/jib-classpath-file @/app/jib-main-class-file /var/otp/${OTP_GRAPH_DIR} --load --serve
