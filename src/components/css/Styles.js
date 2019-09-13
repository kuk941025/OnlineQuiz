import Blue from '@material-ui/core/colors/blue'

export const progress_root = {
    display: 'flex',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 250,
}

export const button = theme => ({
    margin: `${theme.spacing(1)}px 0px`,
    height: 40,
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 400,
    '&:focus': {
        backgroundColor: Blue['A700']
    },
    '&:hover': {
        backgroundColor: Blue['A400']
    },
    backgroundColor: Blue['A700'],

})