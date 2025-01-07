import Card from '../card/Card'
import './List.scss'

function List({ posts }) {
    console.log(posts);


    return (
        <div className='list'>
            {posts.map(item => (
                <Card key={item.id} item={item} />
            ))}
        </div>
    )
}

export default List;