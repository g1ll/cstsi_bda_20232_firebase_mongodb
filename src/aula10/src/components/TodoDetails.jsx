/* eslint-disable react/prop-types */
export function TodoDetails({ details }) {
  return (
    <details style={{ display: 'inline' }}>
      <summary>Detalhes</summary>
      <ul>
        <li>Prioridade: {details.priority > 0 ? 'Mínima' : 'Máxima'}</li>
        <li>Prazo: {details.deadline}</li>
      </ul>
    </details>
  )
}