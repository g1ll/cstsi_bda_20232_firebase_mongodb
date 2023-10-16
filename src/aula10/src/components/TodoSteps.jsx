/* eslint-disable react/prop-types */
export function TodoSteps({ steps }) {
  return (
    <details style={{ display: 'inline' }}>
      <summary>Passos:</summary>
      <ol>
        {steps.map((step, index) =>
          <li key={`step_${index}`}>
            {step.description}
          </li>
        )}
      </ol>
    </details>
  )
}