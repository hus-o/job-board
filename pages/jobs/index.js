import firebase from "../../lib/firebase"

export default function Jobs({jobs}) {
    return(
      <>
      {jobs.map((job) => (
        <div key={job.id}>
          <h3>{job.location}</h3>
          <h4>{job.salary}</h4>
        </div>
      ))}
      </>
    )
  }


export async function getStaticProps() {
  const jobs = []
  const response = await firebase.collection('jobs').get()
  response.forEach((doc) => {
    jobs.push({ id: doc.id, ...doc.data() })
  })

  return {
    props: {
      jobs
    },
  }
}