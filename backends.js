/* The four places one schema can run. Lifted verbatim from the design pack.
 *
 * This is data, not markup. The home page ships the first entry rendered into
 * the HTML so the section is complete without JavaScript; picker.js swaps in
 * the others. Keep the field names — picker.js addresses them by name. */

export const BACKENDS = [
  {
    stage: 'Your laptop',
    name: 'merkql',
    log: 'merkql — an embedded log, no server',
    infra: 'A directory on disk',
    config: 'storage:\n  driver: merkql\n  path:   ./data\n\n# schema, resolvers, clients: untouched',
    when: "Development, demos, and any single-process service that doesn't need a broker.",
    why: 'A directory and one command. No container, no cluster, nothing to install — so a new engineer is productive on day one rather than week two.',
    cost: 'Nothing exists. There is no service to leave running.',
  },
  {
    stage: 'Serverless',
    name: 'merk-aws',
    log: 'merk-aws — compare-and-swap appends',
    infra: 'S3 Express One Zone directory bucket',
    config: 'storage:\n  driver: merk-aws\n  bucket: events--use1-az4--x-s3\n\n# schema, resolvers, clients: untouched',
    when: 'Bursty workloads, and prototypes that need to survive becoming production.',
    why: 'Concurrent Lambdas serialise against the store itself — no broker, no lease, no coordinator to operate. No VPC and no NAT gateway on the bill.',
    cost: 'Nothing running between requests. You pay per event, not per hour.',
  },
  {
    stage: 'Your database',
    name: 'merkpgql',
    log: 'merkpgql — the log as a table',
    infra: 'PostgreSQL you already run',
    config: 'storage:\n  driver: merkpgql\n  url:    ${DATABASE_URL}\n\n# schema, resolvers, clients: untouched',
    when: 'Production, when the operational answer matters more than the throughput number.',
    why: 'No new backup policy, monitoring or security review — it is a table in a database your team already owns. An append can share a transaction with your domain write, so the outbox problem never appears.',
    cost: 'Already on the bill. Nothing new to justify.',
  },
  {
    stage: 'Enterprise',
    name: 'Kafka',
    log: 'Kafka — when the log never goes quiet',
    infra: 'Your existing broker cluster',
    config: 'storage:\n  driver:  kafka\n  brokers: [ kafka-1:9092, kafka-2:9092 ]\n\n# schema, resolvers, clients: untouched',
    when: 'Sustained rather than bursty volume, and other consumers already on the bus.',
    why: 'A broker earns its operational cost only when traffic is continuous. We will tell you when you have reached that point — it is usually further away than you have been told.',
    cost: 'The cluster, whether or not anything is happening.',
  },
];
