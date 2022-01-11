export function imageFormatter (cell, row) {
    return (
        <img src={cell}
    alt={row.title}
    title={row.title}
    width={50}/>
    );
}
export function ratingFormatter (cell, row) {
    let color = 'green';
    if (cell >= 3 && cell < 4) {
        color = 'orange'
    } else if (cell < 3) {
        color = 'red'
    }
    return (<span><strong style={{color: color}}> {cell}</strong></span>

    );
}
