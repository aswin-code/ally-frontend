import { ArrowBack, Close } from "@mui/icons-material"
import { IconButton } from "@mui/material"

const Header = ({ imageSelected }) => {
    return (
        <div style={imageSelected ? { display: 'flex', justifyContent: 'space-between' } : { display: 'flex', justifyContent: 'center' }}>{imageSelected ? <>
            <IconButton>
                <ArrowBack />
            </IconButton>
            <span>
                Crop
            </span>
            <IconButton>
                <Close />
            </IconButton>
        </>
            :
            <span>create new post</span>
        }
        </div>
    )
}

export default Header