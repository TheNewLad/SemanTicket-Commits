import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface ErrorMessage {
  subject: string;
  type: string;
}

export const ErrorMessage = ({ subject, type }: ErrorMessage) => (
  <div className="flex rounded-lg border-2 border-red-300 bg-transparent p-2">
    <ExclamationTriangleIcon className="mr-2 h-6 w-6 text-red-300" />
    <p className="text-red-300">
      {!type && !subject && "Select a type and enter a subject."}
      {!type && subject && "Select a type."}
      {type && !subject && "Enter a subject."}
    </p>
  </div>
);
