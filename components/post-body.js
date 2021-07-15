import { StructuredText, Image } from "react-datocms";
import {Widget} from "@typeform/embed-react/build";

export default function PostBody({ content }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="prose prose-lg prose-blue">
        <StructuredText
          data={content}
          renderBlock={({ record }) => {
            if (record.__typename === "ImageBlockRecord") {
              return <Image data={record.image.responsiveImage} />;
            }

            if (record.__typename === "FormRecord") {
              const typeformUrl = record.typeform.split('/')
              const typeformId = typeformUrl[typeformUrl.length - 1]
              return <Widget id={typeformId} style={{ width: '100%', height: '500px' }} className="my-form" />
            }

            return (
              <>
                <p>Don't know how to render a block!</p>
                <pre>{JSON.stringify(record, null, 2)}</pre>
              </>
            );
          }}
        />
      </div>
    </div>
  );
}
