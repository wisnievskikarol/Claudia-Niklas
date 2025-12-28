import React from "react";
import { Typography, Card, CardBody } from "@material-tailwind/react";
import { FeatureCardProps } from "@/app/types";



export function FeatureCard({ icon: Icon, title, children }: FeatureCardProps) {
  return (
    <Card color="transparent" shadow={false}>
      <CardBody className="grid justify-center text-center">
        <div className="mx-auto mb-6 grid h-12 w-12 place-items-center rounded-lg bg-secondary p-2.5 text-secondary shadow">
          <Icon className="h-5 w-5" />
        </div>
        <Typography variant="h5" className="mb-2">
          {title}
        </Typography>
        <Typography className="px-8 font-normal !text-secondary">
          {children}
        </Typography>
      </CardBody>
    </Card>
  );
}

export default FeatureCard;
