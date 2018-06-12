const channels = [{
      id: 1,
      name: 'hockey'
    }, {
      id: 2,
      name: 'basketball'
    }];

let nextId = 3;

const resolvers = {
    Query: {
        channels: () => channels,
        channel: (root, { id }) => channels.find(channel=>channel.id===id)
    },
    Mutation: {
        addChannel: (root,args) => {
            const newChannel = {id: nextId+=nextId, name: args.name};
            channels.push(newChannel);
            return newChannel;
        }
    }
}

export default resolvers;