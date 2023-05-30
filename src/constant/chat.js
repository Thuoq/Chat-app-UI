export const MESSAGE_OPTIONS = {
  One2One: {
    value: 1,
    label: "one2one",
  },
  Group: {
    value: 2,
    label: "group",
  },
};

export const CHAT_ACTION_URL = {
  sendMessage: {
    [MESSAGE_OPTIONS.One2One.label]: {
      getUrl({ conversationId }) {
        return `/conversations/${conversationId}/messages`;
      },
    },
    [MESSAGE_OPTIONS.Group.label]: {
      getUrl({ conversationId }) {
        return `/messages/group/${conversationId}/messages`;
      },
    },
  },
  getMessages: {
    [MESSAGE_OPTIONS.One2One.label]: {
      getUrl({ conversationId }) {
        return `/conversations/${conversationId}/messages?isDirectMessage=${MESSAGE_OPTIONS.One2One.value}`;
      },
    },
    [MESSAGE_OPTIONS.Group.label]: {
      getUrl({ conversationId }) {
        return `/conversations/${conversationId}/messages?isDirectMessage=${MESSAGE_OPTIONS.Group.value}`;
      },
    },
  },
  getConversations: {
    [MESSAGE_OPTIONS.One2One.label]: {
      getUrl() {
        return `/conversations?isDirectMessage=${MESSAGE_OPTIONS.One2One.value}`;
      },
    },
    [MESSAGE_OPTIONS.Group.label]: {
      getUrl() {
        return `/conversations?isDirectMessage=${MESSAGE_OPTIONS.Group.value}`;
      },
    },
  },
};
