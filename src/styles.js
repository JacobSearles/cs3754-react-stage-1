const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  grow1: {
    flexGrow: 1 // flex grow relative to size of siblings; if they have no flex, this will fill the space
    // used, e.g. AppBar.
  },
  grow2: {
    flexGrow: 2
  },
  voteLeftSideDisplay: {
    padding: theme.spacing.unit * 1,
    margin: theme.spacing.unit * 1
  },
  voteRightSideDisplay: {
    padding: theme.spacing.unit * 1,
    margin: theme.spacing.unit * 1
  },
  indentSome: {
    paddingLeft: theme.spacing.unit * 4
  },
  newQuestionCard: {
    margin: '0 auto',
    width: 800,
    maxWidth: 800,
    marginTop: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2
  },
  topPadding: {
    paddingTop: theme.spacing.unit * 2
  },
  centered: {
    margin: '0 auto', // https://learnlayout.com/max-width.html
    maxWidth: 600
  },
  centerChildren: {
    justifyContent: 'center'
  },
  buttonProgress: {
    color: theme.palette.primary.main[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  textField: {
    width: '100%',
    marginBottom: 16
  }
});

export default styles;
