type StructuredDataValue = Record<string, unknown>

type StructuredDataProps = {
  data: StructuredDataValue | readonly StructuredDataValue[]
}

const serialize = (value: StructuredDataValue) =>
  JSON.stringify(value).replace(/</g, '\\u003c')

export default function StructuredData({ data }: StructuredDataProps) {
  const entries = Array.isArray(data) ? data : [data]

  return (
    <>
      {entries.map((entry, index) => (
        <script
          key={`${String(entry['@type'] ?? 'structured-data')}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serialize(entry) }}
        />
      ))}
    </>
  )
}
